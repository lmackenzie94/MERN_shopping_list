import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemsActions";
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

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };
  // when we click delete button, onDeleteClick will be called with id as argument
  // onDeleteClick calls the action deleteItem with the id as an argument
  // looking at the action, it'll send sent to the reducer which will filter the state to not include the item with the given id

  render() {
    //below, item represents the entire state object, items is the array inside the state (see itemReducer.js)
    const { items } = this.props.item; // object destructuring
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              // use _id because that's how mongoDB is set up
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
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
  { getItems, deleteItem }
)(ShoppingList);
