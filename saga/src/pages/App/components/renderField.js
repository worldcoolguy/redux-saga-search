import React from 'react';
import { FormGroup, Label, Input, Col} from 'reactstrap';

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  //initsearch,
}) => (
  <FormGroup row>
    <Label for="keywordid" >{label}</Label>
    <Col>
      <Input id="keywordid" {...input} placeholder={label} type={type} />
    </Col>
   
    {touched &&
      ((error && <span>{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </FormGroup>
);

export default renderField;
