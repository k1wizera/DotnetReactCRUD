import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export class Produto {
    constructor() {
        this.id = 0;
        this.descricao = "";
    }
}

export function AddProduto() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [produto, setProduto] = useState(new Produto());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (id > 0) {
                const response = await fetch(`https://localhost:7058/api/produtos/${id}`);
                const data = await response.json();
                setTitle("Editar");
                setProduto(data);
            } else {
                setTitle("Criar");
                setProduto(new Produto());
            }
            setLoading(false);
        }
        fetchData();
    }, [id]);

    async function handleSave(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        if (produto.id) {
            const response = await fetch(`https://localhost:7058/api/produtos/${produto.id}`, {
                method: 'PUT',
                body: data,
            });
            navigate('/fetch-produto');
        } else {
            const response = await fetch('https://localhost:7058/api/produtos/', {
                method: 'POST',
                body: data,
            });
            navigate('/fetch-produto');
        }
    }

    function handleCancel(event) {
        event.preventDefault();
        navigate('/fetch-produto');
    }

    function renderCreateForm() {
        return (
            <form onSubmit={handleSave}>
                <div className="form-group row">
                    <input type="hidden" name="id" defaultValue={produto.id} />
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="descricao" defaultValue={produto.descricao} required />
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-success" value={produto.id}>
                        Salvar
                    </button>
                    <button className="btn btn-danger" onClick={handleCancel}>
                        Cancelar
                    </button>
                </div>
            </form>
        );
    }

    return (
        <div>
            <h1>{title}</h1>
            <h3>Produto</h3>
            {loading ? <p><em>Carregando...</em></p> : renderCreateForm()}
        </div>
    );
}

