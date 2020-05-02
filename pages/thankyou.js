import Layout from '../components/layout';

export default () => (
    <Layout>
        <div>
            <h1>Thank you!</h1>
            <p>If this was a real product you could download it here.</p>
        </div>
        <style jsx>{`
            div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-height: 90vh;
            }
        `}</style>
    </Layout>
);