import React, { Fragment } from 'react';
import './index.css';

function CalcularFrete({ events }) {
    if (!events || events.lenght === 0) return null;

    return (
        <Fragment>
            <h1>Detalhes do envio:</h1>
            <ul className="list-group">
                {events.map(item => {
                    return (
                        <li key={item.ValorSemAdicionais} className="list-group-item">
                            <span>{item.ValorSemAdicionais}</span>
                            <span>{item.PrazoEntrega}</span>
                        </li>)
                })}
            </ul>
        </Fragment>
    );
}

export default CalcularFrete;