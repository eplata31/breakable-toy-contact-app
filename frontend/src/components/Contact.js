import React, { Component } from 'react'
import { Table } from 'antd';
import 'antd/lib/table/style/css'
import Contactform from './Contactform'
import EditForm from './EditForm';

class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showEditForm:false,
      showContactForm:false,
      page: 1,
      pages: null,
      totalDocs: null,
      selectedContact: {},
      contacts: [],
      columns: [
        {title: 'Name', key: 'name', dataIndex: 'name'},
        {title: 'Last name', key: 'lastname', dataIndex: 'lastname'},
        {title: 'Email', key: 'email', dataIndex: 'email'},
        {title: 'Phone', key: 'phone', dataIndex: 'phone'},
        {title: 'Company', key: 'company', dataIndex: 'company'},
        {
          title: '', key: 'edit',
          render: (text, record) => (<a onClick={this.onContactCheck.bind(this, record)}>Edit</a>),
        },
        {
          title: '', key: 'delete',
          render: (text, record) => (<a onClick={this.onContactDelete.bind(this, record)}>Delete</a>),
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
          showEditForm:false })
      })
  }

  onContactCheck(contact){
    this.setState({selectedContact: contact, showEditForm:true, showAdd: false})
  }

  onPagerChange(page) {
    this.fetchContacts(page)
  }

  showForm(){
    this.setState({showContactForm: !this.state.showContactForm, showEditForm: false})
  }

  onContactDelete(contact){
    fetch(`http://localhost:8080/contact/${contact._id}`,{
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(contact._id)
      }).then(res => res.json())
            .then(data => {
                console.log(data)
                this.fetchContacts(this.page)
                this.setState({showEditForm:false})
            })
    }

  render() {
    const contactsItems = this.state.contacts.map((contact,index) => { return Object.assign({}, contact, {key: index})})
    return (
      <div>
      <Table columns={this.state.columns} dataSource={contactsItems} pagination={{current: this.state.page, total: this.state.totalDocs, onChange: this.onPagerChange.bind(this)}} />
      <button onClick={this.showForm.bind(this)}>Add contact</button>
      {this.state.showEditForm && <EditForm contact={this.state.selectedContact} reRender={this.fetchContacts.bind(this)}/>}
      {this.state.showContactForm && <Contactform reRender={this.fetchContacts.bind(this)}/>}
      </div>
    )
  }
}


export default Contact