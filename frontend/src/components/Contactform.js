import React, { Component } from 'react'

class Contactform extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            lastname: '',
            email: '',
            phone:'',
            company:''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmmit = this.onSubmmit.bind(this)
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmmit(event) {
        event.preventDefault()

        const postData = {
            name: this.state.name,
            lastname: this.state.lastname,
            company: this.state.company,
            phone: this.state.phone,
            email: this.state.email
        }

        fetch(`http://localhost:8080/contact`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.props.reRender()
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <hr></hr>
                <h1>Add Contact</h1>
                <form onSubmit={this.onSubmmit}>
                    <div>
                        <label>New contact name</label>
                        <input type="text" name="name" onChange={this.onChange} value={this.state.name}></input>
                    </div>
                    <div>
                        <label> New contact last name</label>
                        <input type="text" name="lastname" onChange={this.onChange} value={this.state.lastname}></input>
                    </div>
                    <div>
                        <label>New contact email</label>
                        <input type="text" name="email" onChange={this.onChange} value={this.state.email}></input>
                    </div>
                    <div>
                        <label> New contact phone</label>
                        <input type="text" name="phone" onChange={this.onChange} value={this.state.phone}></input>
                    </div>
                    <div>
                        <label> New contact company</label>
                        <input type="text" name="company" onChange={this.onChange} value={this.state.company}></input>
                    </div>
                    <div>
                        <button type="submmit">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Contactform