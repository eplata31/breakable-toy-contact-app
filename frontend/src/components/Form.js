import React from 'react'

const Form = (props) => {
    return (
        <div>
        <hr></hr>
                <h1>Edit Contact</h1>
                <form onSubmit={props.onSubmmit}>
                    <div>
                        <label>New contact name</label>
                        <input type="text" name="name" onChange={props.onChange} value={props.name}></input>
                    </div>
                    <div>
                        <label> New contact last name</label>
                        <input type="text" name="lastname" onChange={props.onChange} value={props.lastname}></input>
                    </div>
                    <div>
                        <label>New contact email</label>
                        <input type="text" name="email" onChange={props.onChange} value={props.email}></input>
                    </div>
                    <div>
                        <label> New contact phone</label>
                        <input type="text" name="phone" onChange={props.onChange} value={props.phone}></input>
                    </div>
                    <div>
                        <label> New contact company</label>
                        <input type="text" name="company" onChange={props.onChange} value={props.company}></input>
                    </div>
                    <div>
                        <button type="submmit">Save</button>
                    </div>
                </form>
      </div>
    );
}

export default Form