import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid"; // just provides static data for front end development - won't need when we connect to backend
import { connect } from "react-redux";
import { getItems } from "../actions/itemsActions";
import PropTypes from "prop-types";

class ShoppingList extends Component {
  //   state = {
  //     items: [
  //       { id: uuid(), name: "Eggs" }, // uuid() generates a random id
  //       { id: uuid(), name: "Milk" },
  //       { id: uuid(), name: "Steak" },
  //       { id: uuid(), name: "Water" }
  //     ]
  //   };
  // NOTE: calling getItems from within our component instead of storing them in the state above
  //since our state is no longer in this component (it's in the itemReducer.js), we can access state from any other component

  componentDidMount() {
    this.props.getItems();
  }

  render() {
    //below, item represents the entire state object, items is the array inside the state (see itemReducer.js)
    const { items } = this.props.item; // object destructuring
    return (
      <Container>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={() => {
            const name = prompt("Enter Item");
            if (name) {
              this.setState(state => ({
                items: [...state.items, { id: uuid(), name: name }]
              }));
            }
          }}
        >
          Add Item
        </Button>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => {
                      this.setState(state => ({
                        items: state.items.filter(item => item.id !== id)
                      }));
                    }}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};
// when you bring in an action from redux, it's stored as a prop

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getItems }
)(ShoppingList);
