import React from 'react'
import { Form, Input, Button, notification } from 'antd';

class Contactform extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                const postData = {
                    name: values.name,
                    lastname: values.lastname,
                    company: values.company,
                    phone: values.phone,
                    email: values.email
                }
                if (postData.company === '') {
                    postData.company = null
                }
        
                fetch(`http://localhost:8080/contact`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                })
                    .then(res =>{
                        if (res.status === 200){
                            notification.success({
                                message: 'Contact created',
                                description:res.statusText
                            })
                        } else if(res.status === 400){
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
            <hr></hr>
            <h1>Add Contact</h1>
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
                        <Button type="primary" htmlType="submit">Add</Button>
                    </Form.Item>
                </Form>
            </div >
        );
    }
}

const WrappedContactPost = Form.create({ name: 'insert' })(Contactform);

export default WrappedContactPost