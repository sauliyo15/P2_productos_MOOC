import React, { useState } from 'react';
import Product from './Product';
import Header from './Header';
import Location from './Location';


export default function SearchPage(props) {

    const [query, setQuery] = useState('');
    const [finaldata, setFinaldata] = useState(props.theproducts);

    function filtrarInput() {
        let arr = [];
        props.thetitles && props.thetitles.filter((el) => el.toLowerCase().includes(query.toLowerCase()))
            .map((item1, index1) => {
                return (props.theproducts.map((item2, index2) => {
                    return item2.title === item1 ? arr.push(item2) : null
                })
                )
            })
        setFinaldata(arr);
        setQuery('');
        console.log(arr.length);

    }

    function filtrarSelect(option) {
        let arr = [];
        if (option === "all") {
            setFinaldata(props.theproducts);
            setQuery('');

        } else {
            props.thecategories && props.thecategories.filter((el) => el.toLowerCase().includes(option.toLowerCase()))
                .map((item1, index1) => {
                    return (props.theproducts.map((item2, index2) => {
                        return item2.category === item1 ? arr.push(item2) : null
                    })
                    )
                })
            setFinaldata(arr);
            setQuery('');
            console.log(arr.length);
        }
    }

    return (<>
        <Header />
        <Location />
        <div>
            <div className='buscador'>
                <h2 id='catalogo'>Catálogo</h2>
                <div className='cols'>
                    <div className='col1'>
                        <h3>Buscar</h3>
                        <input id='filtro' type='text' placeholder='Busca el producto' value={query} onChange={e => setQuery(e.target.value)}></input>
                        <button id='buscador' onClick={() => filtrarInput()}>Buscar</button>
                    </div>
                    <div className='col2'>
                        <h3>Filtrar</h3>
                        <select id='selector' defaultValue='All' onChange={(e) => filtrarSelect(e.target.value)}>
                            <option value="All">All</option>
                            {props.thecategories && props.thecategories.map((item, index) => {
                                return <option key={index} value={item}>{item}</option>
                            })
                            }
                        </select>
                    </div>
                </div>
            </div>

            {<div id='productosresultados'>
                <ul id='resultados'>
                    {
                        finaldata && finaldata.map((item, index) => (<div key={index}>
                            <li key={index}>
                                <div className='unproducto'>
                                    <Product
                                        key={index}
                                        id={Number(item.id) - 1}
                                        item={item}
                                    />
                                </div>
                            </li>
                        </div>))
                    }
                </ul>

            </div>}

        </div>
    </>);
}