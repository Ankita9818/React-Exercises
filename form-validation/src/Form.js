import React from 'react';

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.constructor.initialState;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static get initialState() {
    return ({
      fields: {
        loginId: '',
        mail: '',
        userName: '',
        timezone: '',
        homepage: '',
        aboutMe: '',
        notification: '',
      },
      errors: {}
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState((prevState) => ({
      fields: {
        ...prevState.fields,
        [name]: value
      }
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.clearErrors();
    if(this.validateFields(event)) {
      this.resetState();
    }
  }

  resetState() {
    this.setState(this.constructor.initialState);
  }

  clearErrors() {
    this.setState({
      errors: {}
    });
  }

  validateFields(event) {
    let isValid = true
    for(const element of event.target.elements) {
      if(this.validatePresence(element)) {
        isValid = false
        this.addPresenceValidationError(element);
      } else if(element.name === 'mail') {
        isValid = this.validateEmailFormat(element);
      } else if(element.name === 'homepage') {
        isValid = this.validateURLFormat(element);
      } else if(element.name === 'aboutMe') {
        isValid = this.validateLength(element);
      }
    }
    return isValid;
  }

  validatePresence(element) {
    return (!element.value || (element.type === 'checkbox' && !element.checked) || element.selectedIndex <= 0);
  }

  addPresenceValidationError(element) {
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        [element.name]: `${element.name} not present`
      }
    }));
  }

  validateEmailFormat(element) {
    var email = element.value.trim();
    const emailRegEx = /^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-z]{2,4})$/;
    let validEmail = emailRegEx.test(email)
    if(!validEmail) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          [element.name]: `${element.name} has invalid format`
        }
      }));
    }
    return validEmail;
  };

  validateURLFormat(element) {
    var url = element.value.trim();
    const urlRegEx = /^(((http[s]?)|(ftp)):\/\/)?(www\.)?[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}[\/]?/;
    let validURL = urlRegEx.test(url)
    if(!validURL) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          [element.name]: `${element.name} has invalid format`
        }
      }));
    }

    return validURL;
  };

  validateLength(element) {
    const maxLength = 50;
    let validLength = (element.value.length >= maxLength)
    if(!validLength) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          [element.name]: `${element.name} should have at least ${maxLength} characters`
        }
      }));
    }

    return validLength;
  };

  render() {
    const { fields, errors } = this.state
    return (
      <div className='container'>
        <h2 className='text-center header'>Registration Form</h2>
        <form className='form' name='form1' onSubmit={this.handleSubmit}>
          <label className='inputLabels font-bold' htmlFor='loginId'>Login Id</label>
          <input className='inputs' type='text' id='loginId' name='loginId' value={fields.loginId} onChange={this.handleInputChange} /><br />
          <span className='text-error'>{errors.loginId}</span><br />
          <label className='inputLabels font-bold' htmlFor='mail'>Email</label>
          <input className='inputs' type='text' id='mail' name='mail' value={fields.mail} onChange={this.handleInputChange} /><br />
          <span className='text-error'>{errors.mail}</span><br />
          <label className='inputLabels font-bold' htmlFor='name'>Name</label>
          <input className='inputs' type='text' id='name' name='userName' value={fields.userName} onChange={this.handleInputChange} /><br />
          <span className='text-error'>{errors.userName}</span><br />
          <label className='inputLabels font-bold' htmlFor='timezone'>Timezone</label>
          <select id='timezone' className='inputLabels font-bold' name='timezone' value={fields.timezone} onChange={this.handleInputChange}>
            <option>Choose timezone</option>
            <option>GMT</option>
            <option>GST</option>
            <option>FKT</option>
            <option>FNT</option>
          </select><br />
          <span className='text-error'>{errors.timezone}</span><br />
          <label className='inputLabels font-bold' htmlFor='homepage'>Home Page</label>
          <input className='inputs' type='text' id='homepage' name='homepage' value={fields.homepage} onChange={this.handleInputChange} /><br />
          <span className='text-error'>{errors.homepage}</span><br />
          <label className='inputLabels font-bold' htmlFor='aboutMe'>About Me</label><br />
          <textarea className='textarea' id='aboutMe' rows='10' name='aboutMe' value={fields.aboutMe} onChange={this.handleInputChange}></textarea><br />
          <span className='text-error m-l-0'>{errors.aboutMe}</span><br />
          <input type='checkbox' id='notification' name='notification' checked={fields.notification} onChange={this.handleInputChange} />
          <label htmlFor='notification' className='font-bold'>Receive notifications of comments</label><br />
          <span className='text-error m-l-0'>{errors.notification}</span><br />
          <p>You will be sent an email when someone posts comments to your Blog or Album.</p>
          <p className='text-center'>Your password will be mailed to you.</p>
          <input type='submit' name='submit' className='btn-go' value='Go' />
        </form>
      </div>
    );
  }
}


export default Form;