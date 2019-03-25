import React, { Component } from 'react'
import { Table, Divider, Button } from 'antd';
import 'antd/dist/antd.css'
import Contactform from './Contactform'
import EditForm from './EditForm';
import { notification } from 'antd'

class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showEditForm: false,
      showContactForm: false,
      showAlert: false,
      page: 1,
      pages: null,
      totalDocs: null,
      selectedContact: {},
      contacts: [],
      columns: [
        { title: 'Name', key: 'name', dataIndex: 'name' },
        { title: 'Last name', key: 'lastname', dataIndex: 'lastname' },
        { title: 'Email', key: 'email', dataIndex: 'email' },
        { title: 'Phone', key: 'phone', dataIndex: 'phone' },
        { title: 'Company', key: 'company', dataIndex: 'company' },
        {
          title: '', key: 'edit',
          render: (text, record) => (
            <span>
              <Button onClick={this.onContactCheck.bind(this, record)}>Edit</Button>
              <Divider type="vertical" />
              <Button type="danger" onClick={this.onContactDelete.bind(this, record)}>Delete</Button>
            </span>
          ),
        }
      ]
    }
  }

  componentWillMount() {
    this.fetchContacts(this.state.page)
  }

  fetchContacts(page) {
    return fetch(`http://localhost:8080/contact?page=${page}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          pages: data.totalPages,
          contacts: data.docs,
          page: data.page,
          totalDocs: data.totalDocs,
          showContactForm: false,
          showEditForm: false
        })
      }).catch(error => {
        notification.error({
          message: error.message,
          description: error.description
        })
      })
  }

  onContactCheck(contact) {
    this.setState({ selectedContact: contact, showEditForm: true, showContactForm: false })
  }

  onPagerChange(page) {
    this.fetchContacts(page)
  }

  showAddForm() {
    this.setState({ showContactForm: !this.state.showContactForm, showEditForm: false })
  }

  cancelForms() {
    this.setState({ showContactForm: false, showEditForm: false })
  }

  onContactDelete(contact) {
    fetch(`http://localhost:8080/contact/${contact._id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(contact._id)
    }).then(res => {
      if(res.status === 400){
        notification.error({
            message: 'Error',
            description: res.statusText
          })
    } else if(res.status === 200){
        notification.success({
            message: 'Contact deleted',
          })
    }
    })
      .then(data => {
        console.log(data)
        this.fetchContacts(this.page)
        this.setState({ showEditForm: false })
      })
  }

  onClose = (e) => { };

  render() {
    const contactsItems = this.state.contacts.map((contact, index) => { return Object.assign({}, contact, { key: index }) })
    return (
      <div>
        <Table columns={this.state.columns} dataSource={contactsItems} pagination={{
          current: this.state.page,
          total: this.state.totalDocs, onChange: this.onPagerChange.bind(this)
        }} />
        <Button type="primary" onClick={this.showAddForm.bind(this)}>Add contact</Button>
        {(this.state.showContactForm || this.state.showEditForm) && <Button ghost type="danger" onClick={this.cancelForms.bind(this)}>Cancel</Button>}
        {this.state.showContactForm && <Contactform reRender={this.fetchContacts.bind(this)} />}
        {this.state.showEditForm && <EditForm contact={this.state.selectedContact} reRender={this.fetchContacts.bind(this)} />}
      </div>
    )
  }
}


export default Contact