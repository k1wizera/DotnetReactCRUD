import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { FetchProduto } from "./components/FetchProduto";
import { AddProduto } from "./components/AddProduto";
import { Home } from "./components/Home";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/fetch-produto',
        element: <FetchProduto />
    },
    {
        path: '/add-produto',
        element: <AddProduto />
    },
    {
        path: '/produto/edit/:id',
        element: <AddProduto />
    }
];

export default AppRoutes;
