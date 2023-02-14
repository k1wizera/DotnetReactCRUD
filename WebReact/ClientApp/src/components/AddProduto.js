import React, { Component } from 'react'
import { useParams } from 'react-router-dom';


export class Produto {

    constructor() {
        this.id = 0;
        this.descricao = "";
    }
}
export class AddProduto extends Component {

    constructor(props) {
        super(props);
        this.state = { title: "", produto: new Produto(), loading: true }
        this.inicialize();

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    async inicialize() {

        var id = this.props.match.params["id"];

        if (id > 0) {
            const response = await fetch('https://localhost:7058/api/produtos/');
            const data = await response.json();
            this.setState({ title: "Edit", produto: data, loading: false });
        }
        else {
            this.state = { title: "Create", produtos: new Produto(), loading: false }
        }
    }


    render() {
        let contents = this.state.loading
            ? <p><em> Carregando ...</em></p>
            : this.renderCreateForm();

        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Produto</h3>

                {contents}
            </div>
        );
    }

    async handleSave(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        if (this.state.produto.id) {
            const response1 = await fetch('https://localhost:7058/api/produtos/' + this.state.produto.id, { method: 'PUT', body: data });
            this.props.history.push('/fetch-produto');
        }
        else {
            const response2 = await fetch('https://localhost:7058/api/produtos/', { method: 'POST', body: data });
            this.props.history.push('/fetch-produto');
        }
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/fetch-produto');
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSave}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.produto.id} />
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="descricao" defaultValue={this.state.produto.descricao} required />
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-success" value={this.state.produto.id}>Salvar</button>
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cancelar</button>
                </div>
            </form>
        );
    }
    
}