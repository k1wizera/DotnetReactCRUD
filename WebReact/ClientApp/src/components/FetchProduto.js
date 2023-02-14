import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class FetchProduto extends Component {
    static displayName = "Produtos";

    constructor() {
        super();
        this.state = { produtos: [], loading: true }
    }

    componentDidMount() {
        this.populaProdutoData();
    }

    static handleEdit(id) {
        window.location.href = '/produto/edit/' + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Você deseja deletar o produto: " + id + "?")) {
            return;
        }
        else {
            fetch('https://localhost:7058/api/produtos/' + id, { method: 'delete' })
                .then(json => {
                    window.location.href = "fetch-produto";
                    alert("Produto deletado com sucesso!");
                })
        }
    }

    static renderProdutosTabela(produto) {
        return (
            <table className='table table-striped' aria-labelledby='tablelabel'>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {produto.map(prod =>
                        <tr key={prod.id}>
                            <td>{prod.id}</td>
                            <td>{prod.descricao}</td>

                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(prod.id)}>Edit</button> &nbsp;
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(prod.id)}>Delete</button> 
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );

    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando ...</em></p>
            : FetchProduto.renderProdutosTabela(this.state.produtos)

        return (
            <div>
                <h1 id='tablelabel'>Produtos</h1>
                <p>Tela de listagem de produtos</p>
                <p>
                    <Link to='/add-produto'>Cadastrar Produto</Link>
                </p>

                {contents}
            </div>
        );
    }

    async populaProdutoData() {
        const response = await fetch('https://localhost:7058/api/produtos');
        const data = await response.json();
        this.setState({ produtos: data, loading: false });
    }
}