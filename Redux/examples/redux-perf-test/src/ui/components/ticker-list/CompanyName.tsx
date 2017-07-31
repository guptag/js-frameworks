import * as React from 'react';

interface ICompanyNameProps {
  name: string;
}

class CompanyName extends React.Component<ICompanyNameProps, null> {
  render() {
    return (
      <section className="company">
          <div>{this.props.name}</div>
      </section>
    );
  }
}

export default CompanyName;