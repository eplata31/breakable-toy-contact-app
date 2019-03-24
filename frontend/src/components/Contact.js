import React, { Component } from 'react'
import { Table } from 'antd';
import 'antd/lib/table/style/css'
import Contactform from './Contactform'

class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
        {title: 'Company', key: 'company', dataIndex: 'company'}
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
        this.setState({ pages: data.totalPages, contacts: data.docs, page: data.page, totalDocs: data.totalDocs })
      })
  }

  onPagerChange(page) {
    this.fetchContacts(page)
  }

  onContactClick(contact) {
    console.log(contact)
    this.setState({ selectedContact: contact })
  }

  onFormFieldChange(event) {
    console.log('alskjdhakshdgaskh')
    const contact = Object.assign({}, this.state.contact, { [event.target.name]: event.target.value });
    this.setState({ selectedContact: contact })
  }

  render() {
    const contactsItems = this.state.contacts.map((contact,index) => { return Object.assign({}, contact, {key: index})})
    return (
      <div>
      <Table columns={this.state.columns} dataSource={contactsItems} pagination={{current: this.state.page, total: this.state.totalDocs, onChange: this.onPagerChange.bind(this)}} />
      <Contactform contact={this.state.selectedContact} onFormFieldChange={this.onFormFieldChange.bind(this)} />
      </div>
    )
  }
}


export default Contact