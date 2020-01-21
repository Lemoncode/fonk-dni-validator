import { ValidationSchema, createFormValidation } from '@lemoncode/fonk';
import { nif } from '@lemoncode/fonk-nif-validator';

const validationSchema: ValidationSchema = {
  field: {
    myField: [
      {
        validator: nif.validator,
        customArgs: { validTypes: [nif.types.DNI, nif.types.NIE] },
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

Promise.all([
  formValidation.validateField('myField', 'B11111111'),
  formValidation.validateField('myField', '31016922L'),
]).then(([failedResult, succeededResult]) => {
  document.getElementById('app').innerHTML = `
<div style="flex-grow: 1;margin-left:2rem;">
  <h2>Example with failed result:</h2>

<pre>
  formValidation.validateField('myField', 'B11111111')
</pre>

  <h3>Result: </h3>
<pre>
${JSON.stringify(failedResult, null, 2)}
</pre>
</div>

<div style="flex-grow: 1;">
  <h2>Example with succeeded result:</h2>

<pre>
formValidation.validateField('myField', '31016922L')
</pre>

  <h3>Result: </h3>
<pre>
${JSON.stringify(succeededResult, null, 2)}
</pre>
</div>
`;
});
