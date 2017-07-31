import * as React from 'react';

export interface HeaderProps {
  addTodo: (text:string)=> any;
};

class UpdateHighlighter extends React.Component<null, null> {
  render() {
    return (
      <section className="stats">
          <div>highlight</div>
      </section>
    );
  }
}

export default UpdateHighlighter;