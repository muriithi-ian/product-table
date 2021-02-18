import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const ProductRow = (props) => {

    const product = props.product;
    const name = product.stocked ?
        product.name :
        <span style={{ color: 'red' }}>
            {product.name}
        </span>;

    return (
        <tr>
            <td>{name}</td>
            <td></td>
            <td>{product.price}</td>
        </tr>
    );
}

const ProductCategoryRow = (props) => {

    const category = props.category;
    return (
        <tr>
            <th colSpan="2">
                {category}
            </th>
        </tr>
    );
}


const ProductTable = (props) => {

    const filterText = props.filterText
    const inStock = props.inStock

    const rows = [];
    let lastCategory = null;


    props.products.forEach((product) => {
        if (product.name.indexOf(filterText) === -1) {
            return;
        }
        if (inStock && !product.stocked) {
            return;
        }
        if (product.category !== lastCategory) {
            rows.push(
                <ProductCategoryRow
                    category={product.category}
                    key={product.category} />
            );
        }
        rows.push(
            <ProductRow
                product={product}
                key={product.name} />
        );
        lastCategory = product.category;
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th></th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}



class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e) {
        this.props.onInStockChange(e.target.checked);
    }

    render() {

        return (
            <form>
                <input
                    type="text"
                    placeholder="Search"
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
                <p>
                    <input
                        type="checkbox"
                        checked={this.props.inStock}
                        onChange={this.handleInStockChange}
                    />
                    {' '}only show products in stock
                </p>
            </form>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStock: false
        }

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }
    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockChange(inStock) {
        this.setState({
            inStock: inStock
        })
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStock={this.state.inStock}
                    onFilterTextChange={this.handleFilterTextChange}
                    onInStockChange={this.handleInStockChange}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStock={this.state.inStock}
                />
            </div>
        );
    }
}


const PRODUCTS = [
    { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
    { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
    { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
    { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
    { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
    { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

//==================================================

ReactDOM.render(
    <App products={PRODUCTS} />,
    document.getElementById('root')
);