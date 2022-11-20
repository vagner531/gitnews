import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";

// Função para pegar todas as info retornadas pouco a pouco, e transformar em um Objeto Buffer 
async function buffer(readable: Readable) {
  const chunks = [];

  for await(const chunk of readable) {
    chunks.push(
      typeof chunk === "string" ? Buffer.from(chunk) : chunk
    );
  }

  return Buffer.concat(chunks);
}

/*Por padrão, o Next espera que as Req. sejam JSON e afins, como essa Req. é uma stream, 
desabilitamos o comportamento padrão através dessa config.*/
export const confing = {
  api: {
    bodyParser: false
  },
};

const relevantEvents = new Set([
  "checkout.session.completed"
])

export default async function webhooks(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const secret = req.headers['stripe-signature']

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {

      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
      console.log('Evento Recebido', event)
    }

    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}