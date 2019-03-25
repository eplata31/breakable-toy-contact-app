import React, { Component } from 'react'

class EditForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            lastname: '',
            email: '',
            phone: '',
            company: '',
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmmit = this.onSubmmit.bind(this)
    }

    componentDidUpdate(previousProps) {
        if (this.props.contact !== previousProps.contact) {
            this.setState({ 
                id: this.props.contact._id,
                name: this.props.contact.name,
                lastname: this.props.contact.lastname,
                email: this.props.contact.email,
                phone: this.props.contact.phone,
                company: this.props.contact.company
             })
        }
    }

    componentWillMount(){
        this.setState({ 
            id: this.props.contact._id,
            name: this.props.contact.name,
            lastname: this.props.contact.lastname,
            email: this.props.contact.email,
            phone: this.props.contact.phone,
            company: this.props.contact.company
         })
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    
    onSubmmit(event) {
        event.preventDefault()

        const putData = {
            name: this.state.name,
            lastname: this.state.lastname,
            company: this.state.company,
            phone: this.state.phone,
            email: this.state.email
        }
        if (putData.company === '') {
            putData.company = null
        }

        fetch(`http://localhost:8080/contact/${this.state.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(putData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.props.reRender()
            })
    }

  render() {
    return (
    <div>
        <hr></hr>
                <h1>Edit Contact</h1>
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

export default EditForm