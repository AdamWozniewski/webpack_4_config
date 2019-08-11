import { connect } from 'react-redux';
import ModalRoot from '../../modal/ModalRoot';
import { showModal } from '../../../actions/modal/modalActions';

const mapStateToProps = state => ({
  modal: state.modalReducer,
});

const mapDispatchToProps = dispatch => ({
  showModal: bool => dispatch(showModal(bool))
});

const ModalRootComponent = connect(mapStateToProps, mapDispatchToProps)(ModalRoot);
export default ModalRootComponent;
