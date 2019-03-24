import React, { Component } from 'react'
import { Pagination } from 'antd'
import 'antd/lib/pagination/style/css'

class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      pages: null,
      contacts: [],
      totalDocs: null
    }
  }

  componentWillMount(){
    this.fetchContacts(this.state.page)
  }

  fetchContacts(page) {
    return fetch(`http://localhost:8080/allContacts?page=${page}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ pages: data.totalPages, contacts: data.docs, page: data.page, totalDocs: data.totalDocs})
      })
  }

  onPagerChange(page) {
    this.fetchContacts(page)
  }

  render() {
    const contactsItems = this.state.contacts.map(contact => (
      <div key={contact._id}>
        <p>{contact.name} {contact.lastname}</p>
      </div>
    ))
    return (
      <div>
        <h1>Contacts</h1>
        {contactsItems}
        <Pagination defaultCurrent={1} current={this.state.page} total={this.state.totalDocs} onChange={this.onPagerChange.bind(this)} />
      </div>
    )
  }
}


export default Contact