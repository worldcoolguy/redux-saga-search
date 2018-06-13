import React from 'react';
import { Field } from 'redux-form';
export const renderSelectField = (field) => {
  return (<div>
      <label>Type : </label>
      <Field name="searchtype" component="select">
        <option value="user">User</option>
        <option value="repos">Repos</option>
      </Field>
  </div>
  );
};
export default renderSelectField;