import React, { Component } from 'react'
import { Form, Input, Button, notification } from 'antd'

class EditForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            lastname: '',
            email: '',
            company: '',
            phone:''
        }

        this.onChange = this.onChange.bind(this)
    }

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    componentDidMount() {
        this.props.form.setFieldsValue({
            name: this.state.name,
            lastname: this.state.lastname,
            email: this.state.email,
            company: this.state.company,
            phone: this.state.phone
        })
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                const putData = {
                    name: values.name,
                    lastname: values.lastname,
                    company: values.company,
                    phone: values.phone,
                    email: values.email
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
                    .then(res =>{
                        if (res.status === 200){
                            notification.success({
                                message: 'Contact updated',
                            })
                        } else if(res.status === 400){
                            notification.error({
                                message: 'Error',
                                description:res.statusText
                            })
                        } else if(res.status === 404){
                            notification.error({
                                message: 'Error',
                                description:res.statusText
                            })
                        } else if(res.status === 500){
                            notification.error({
                                message: 'Error',
                                description:res.statusText
                            })
                        }
                    })
                    .then(data => {
                        console.log(data)
                        this.props.reRender()  
                    })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
                md: { span: 8}
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
                md: { span: 8 }
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    offset: 0,
                },
                sm: {
                    offset: 6,
                },
                md: {
                    offset: 8,
                },
            },
        };
        
        return (
            <div id="divForm">
            <br></br>
            <h1>Edit Contact</h1>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label={(<span>Name&nbsp;</span>)}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Name is required', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label={(<span>Last name&nbsp;</span>)}>
                        {getFieldDecorator('lastname', {
                            rules: [{ required: true, message: 'Last name is required', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not a valid E-mail',
                            }, {
                                required: true, message: 'E-mail is requierd',
                            }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="Phone Number">
                        {getFieldDecorator('phone', {
                            rules: [{ required: false }],
                        })(
                            <Input  />
                        )}
                    </Form.Item>
                    <Form.Item label={(<span>Company&nbsp;</span>)}>
                        {getFieldDecorator('company', {
                            rules: [{ required: false, whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Update</Button>
                    </Form.Item>
                </Form>
            </div >
        );
    }
}

const WrappedContactPut = Form.create({ name: 'update' })(EditForm);

export default WrappedContactPut