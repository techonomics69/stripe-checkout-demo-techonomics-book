import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_SECRET);

export default async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            name: 'My Awesome Book',
            description: 'The book I wrote while making an example of how to use Stripe with Next JS',
            images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80'],
            amount: 1000,
            currency: 'usd',
            quantity: 1,
        }],
        success_url: `${(process.env.NODE_ENV === 'development') ? 'http://' : 'https://'}${req.headers['x-forwarded-host'] || req.headers.host}/thankyou?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${(process.env.NODE_ENV === 'development') ? 'http://' : 'https://'}${req.headers['x-forwarded-host'] || req.headers.host}`,
    });
    res.json({id: session.id});
};