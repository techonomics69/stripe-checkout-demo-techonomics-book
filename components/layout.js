import Head from 'next/head';

const Layout = ({children}) => (
    <div>
        <Head>
            <title>My Awesome Book</title>
            <script src="https://js.stripe.com/v3/"></script>
        </Head>
        <style jsx global>{`
            body {
                margin: 0;
                padding: 0;
                background-color: #F7FAFC;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
                color: #4A5568;
            }
        `}</style>
        {children}
    </div>
);

export default Layout;