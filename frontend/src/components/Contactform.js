import React, { Component } from 'react'

class Contactform extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contact: props.contact,
            name: '',
            lastname: '',
            company: '',
            phone: null,
            email: ''
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

        fetch(`http://localhost:8080/contact${this.state.contact._id ? '/' + this.state.contact._id : ''}`, {
            method: this.state.contact._id ? 'PUT' : 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
    componentWillMount() {
        if (this.props.contact)
            this.setState({ contact: this.props.contact })
    }

    componentWillReceiveProps(previewProps, nextProps) {
        if (nextProps.contact)
            this.setState({ contact: nextProps.contact })
    }

    render() {
        return (
            <div>
                <h1>Add Contact</h1>
                <hr></hr>
                <form onSubmit={this.onSubmmit}>
                    <div>
                        <label>New contact name</label>
                        <input type="text" name="name" onChange={this.onChange} value={this.state.contact.name}></input>
                    </div>
                    <div>
                        <label> New contact last name</label>
                        <input type="text" name="lastname" onChange={this.onChange} value={this.state.contact.lastname}></input>
                    </div>
                    <div>
                        <label>New contact email</label>
                        <input type="text" name="email" onChange={this.onChange} value={this.state.contact.email}></input>
                    </div>
                    <div>
                        <label> New contact phone</label>
                        <input type="text" name="phone" onChange={this.onChange} value={this.state.contact.phone}></input>
                    </div>
                    <div>
                        <label> New contact company</label>
                        <input type="text" name="company" onChange={this.onChange} value={this.state.contact.company}></input>
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