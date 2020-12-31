import React, { Fragment } from 'react';
import './index.css';

function TrackingEvents({ events }) {
    if (!events || events.lenght === 0) return null;

    return (
        <Fragment>
            <h1>Detalhes do envio:</h1>
            <ul className="list-group">
                {events.map(item => {
                    return (
                        <li key={item.descricao} className="list-group-item">
                            <span>{item.data} {item.hora}</span>
                            <span>{item.descricao}</span>
                            <span>{item.cidade}/{item.uf}</span>
                        </li>)
                })}
            </ul>
        </Fragment>
    );
}

export default TrackingEvents;