import "./App.css";
import Layout from "./component/Layout";
import Balance from "./component/Balance";
import Transactions from "./component/Transactions";
import Form from "./component/Form";

function App() {
  return (
    <div>
      <Layout>
        <Balance />
        <Form />
        <Transactions />
      </Layout>
    </div>
  );
}

export default App;
