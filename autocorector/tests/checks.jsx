import {render, fireEvent, waitFor, waitForElementToBeRemoved, screen, act} from '@testing-library/react'
import App from '../../src/App';
import Header from '../../src/Header';
import SearchPage from '../../src/SearchPage';
import user_info from '../../user.json';
import {mockdata} from "../utils/products.js";
import {mockdata2} from "../utils/products2.js";
import {mockdata as studentmockproducts} from "../../src/constants/products";
import {MemoryRouter, BrowserRouter} from 'react-router-dom';


const mytestconfig = {
  server_url: "https://dummyjson.com/products",
  num_items: 30,  
  use_server: false,
  loading_timeout_ms: 2000
};

jest.setTimeout(10000);

jest.mock('../../src/config/config', () => ( {
  __esModule: true,
  default: mytestconfig  
} ));

afterAll(() => jest.resetAllMocks());

beforeAll(() => {
  jest.useFakeTimers()
});

// Running all pending timers and switching to real timers using Jest
afterAll(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
});


let testinfo = {
    name: "La aplicación tiene un componente Header con el logo y el mensaje de bienvenida con tu nombre",
    score: 1,
    msg_ok: "Header encontrada",
    msg_error: "Header no encontrada o no es como se esperaba, revise el enunciado"
}
test(JSON.stringify(testinfo), () => {
  render(<Header />);
  const cabecera = document.querySelector('#cabecera');
  const logo = document.querySelector('.logo');
  const mensaje = document.querySelector('.mensaje');

  expect(cabecera).toBeInTheDocument();
  expect(user_info).toHaveProperty('name');
  expect(user_info).toHaveProperty('email');
  expect(user_info).toHaveProperty('token');
  expect(mensaje).toHaveTextContent(new RegExp(user_info.name, 'i'));
  expect(cabecera.tagName).toBe('DIV');
  expect(cabecera).toContainElement(logo);
  expect(cabecera).toContainElement(mensaje);
});

testinfo = {
  name: "La aplicación, mientras carga, muestra un spinner con una clase 'spinner' y un id 'loading'",
  score: 1,
  msg_ok: "spinner encontrado",
  msg_error: "spinner NO encontrado mientras la aplicación carga"
}
test(JSON.stringify(testinfo), () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const spinner = document.querySelector('#loading');
  expect(spinner).toBeInTheDocument();
  const spinnerbyclass = document.querySelector('.spinner');
  expect(spinnerbyclass).toBeInTheDocument();
  const catalogo = document.querySelector('#catalogo');
  expect(catalogo).not.toBeInTheDocument();
});


testinfo = {
  name: "La aplicación tiene un componente SearchPage, con al menos un input y un button",
  score: 1,
  msg_ok: "Componente SearchPage encontrado y con input y button correctos",
  msg_error: "El componente SearchPage no se ha encontrado o no tiene el input y button correctos"
}
test(JSON.stringify(testinfo), () => {
  render(<BrowserRouter><SearchPage theproducts={mockdata.products} /></BrowserRouter>);
  const theinput = document.querySelector('#filtro');
  expect(theinput).toBeInTheDocument();
  expect(theinput.tagName).toBe('INPUT');
  const buscabtn = document.querySelector('#buscador');
  expect(buscabtn).toBeInTheDocument();
  expect(buscabtn.tagName).toBe('BUTTON');
});


testinfo = {
  name: "La aplicación tiene un componente SearchPage que renderiza los productos que recibe",
  score: 1,
  msg_ok: "Componente SearchPage encontrado productos renderizados",
  msg_error: "El componente SearchPage no se ha encontrado o no renderiza correctamente los productos"
}
test(JSON.stringify(testinfo), () => {
  render(<BrowserRouter><SearchPage theproducts={mockdata.products} /></BrowserRouter>);
  const productos = document.querySelectorAll('#productosresultados .unproducto');
  expect(productos.length).toBe(37);
});


testinfo = {
  name: "La aplicación maneja el valor del input y filtra los resultados por su título al pulsar el button",
  score: 1,
  msg_ok: "El input de la aplicación funciona correctamente y filtra al pulsar el botón",
  msg_error: "El input de la aplicación NO funciona correctamente o NO filtra al pulsar el botón"
}
test(JSON.stringify(testinfo), () => {
  render(<BrowserRouter><SearchPage theproducts={mockdata.products} /></BrowserRouter>);
  const theinput = document.querySelector('#filtro');
  expect(theinput).toBeInTheDocument();
  const buscabtn = document.querySelector('#buscador');
  expect(buscabtn).toBeInTheDocument();
  fireEvent.change(theinput, {target: {value: "moto"}})
  expect(theinput).toHaveValue("moto");
  fireEvent.click(buscabtn);
  const productos = document.querySelectorAll('#productosresultados .unproducto');
  expect(productos.length).toBe(4);
});


testinfo = {
  name: "La aplicación tiene un selector de categorías de productos y está relleno correctamente para mockdata",
  score: 0.5,
  msg_ok: "Selector de categorías de productos encontrado y bien relleno",
  msg_error: "Selector de categorías de productos NO encontrado o NO está bien relleno"
}
test(JSON.stringify(testinfo), () => {
  render(<BrowserRouter><SearchPage theproducts={mockdata.products} /></BrowserRouter>);
  const theselector = document.querySelector('#selector');
  expect(theselector).toBeInTheDocument();
  const selectoroptions = document.querySelectorAll('#selector option');
  expect(selectoroptions.length).toBe(9);
  expect([...selectoroptions].map((x)=>x.value)).toEqual(
    expect.arrayContaining(["All", "mens-watches", "womens-watches", "womens-bags", "womens-jewellery", "sunglasses", "automotive", "motorcycle", "lighting"]));
});


testinfo = {
  name: "La aplicación tiene un selector de categorías de productos y está relleno correctamente para mockdata2",
  score: 0.5,
  msg_ok: "Selector de categorías de productos encontrado y bien relleno",
  msg_error: "Selector de categorías de productos NO encontrado o NO está bien relleno"
}
test(JSON.stringify(testinfo), () => {    
  render(<BrowserRouter><SearchPage theproducts={mockdata2.products} /></BrowserRouter>);
  const theselector2 = document.querySelector('#selector');
  expect(theselector2).toBeInTheDocument();
  const selectoroptions2 = document.querySelectorAll('#selector option');
  expect(selectoroptions2.length).toBe(7);
  expect([...selectoroptions2].map((x)=>x.value)).toEqual(
    expect.arrayContaining(["All", "tops", "womens-dresses", "womens-shoes", "mens-shirts", "mens-shoes", "mens-watches"]));
});


testinfo = {
  name: "La aplicación tiene un selector de categorías de productos y filtra al seleccionar una categoría",
  score: 1,
  msg_ok: "El selector de categorías funciona correctamente",
  msg_error: "El selector de categorías NO funciona correctamente"
}
test(JSON.stringify(testinfo), () => {
  render(<BrowserRouter><SearchPage theproducts={mockdata.products} /></BrowserRouter>);
  const theselector = document.querySelector('#selector');
  expect(theselector).toBeInTheDocument();
  fireEvent.change(theselector, {target: {value: "automotive"}})

  const productos = document.querySelectorAll('#productosresultados .unproducto');
  expect(productos.length).toBe(5);
});


testinfo = {
  name: "La aplicación tiene un componente para la página de un producto",
  score: 1,
  msg_ok: "La página del producto funciona correctamente",
  msg_error: "La página del producto NO funciona correctamente"
}
test(JSON.stringify(testinfo), async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    status: 200,
    json: () => Promise.resolve(mockdata)
  }));

  render(<MemoryRouter initialEntries={["/products/3"]}>
    <App />
  </MemoryRouter>);

  await waitForElementToBeRemoved(await document.querySelector('#loading'), { timeout: 8000 })

  const titulo = document.querySelector('#titulo');
  expect(titulo).toBeInTheDocument();
  expect(titulo).toHaveTextContent(studentmockproducts.products[3].title);

  const divlocation = document.querySelector('#divlocation');
  expect(divlocation).toBeInTheDocument();
  expect(divlocation).toHaveTextContent("/products/3");

  const divproductid = document.querySelector('#divproductid');
  expect(divproductid).toBeInTheDocument();
  expect(divproductid).toHaveTextContent("3");

  const volver = document.querySelector('#volver');
  expect(volver).toBeInTheDocument();    
  
});


testinfo = {
  name: "La aplicación tiene una ruta para NoMatch",
  score: 1,
  msg_ok: "La ruta NoMatch funciona correctamente",
  msg_error: "La ruta NoMatch NO funciona correctamente"
}
test(JSON.stringify(testinfo), async () => {

  render(<MemoryRouter initialEntries={["/rutanoexiste"]}>
    <App />
  </MemoryRouter>);
  //run the setTimeout so the loading spinner is removed from the UX
  //await waitForElementToBeRemoved(await document.querySelector('#loading'), { timeout: 8000 });

  const info = document.querySelector('#info');
  expect(info).toBeInTheDocument();
  expect(info).toHaveTextContent("Ruta no encontrada");

  const volver = document.querySelector('#volver');
  expect(volver).toBeInTheDocument();    
  
});