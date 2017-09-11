'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _reactCustomScrollbars = require('react-custom-scrollbars');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Material design bottom sheet
 * @see [Bottom Sheet](https://material.io/guidelines/components/bottom-sheets.html)
 */
var ExpandableBottomSheet = function (_Component) {
  _inherits(ExpandableBottomSheet, _Component);

  function ExpandableBottomSheet(props) {
    _classCallCheck(this, ExpandableBottomSheet);

    var _this = _possibleConstructorReturn(this, (ExpandableBottomSheet.__proto__ || Object.getPrototypeOf(ExpandableBottomSheet)).call(this, props));

    _this.handleClickOverlay = function (e) {
      e.preventDefault();
      _this.props.onRequestClose();
    };

    _this.state = {
      outerTop: 0
    };
    return _this;
  }

  _createClass(ExpandableBottomSheet, [{
    key: 'onOuterScroll',
    value: function onOuterScroll(values) {
      var _this2 = this;

      if (this.state.outerTop !== values.top) {
        this.setState({ outerTop: values.top }, function () {
          if (values.top >= 0.99 && _this2.props.onTopReached) {
            _this2.props.onTopReached();
          }
        });
      }
    }
  }, {
    key: 'getStyles',
    value: function getStyles() {
      var open = this.props.open;
      var outerTop = this.state.outerTop;


      return {
        root: {
          height: '100vh',
          width: '100vw',
          position: 'fixed',
          zIndex: 1300,
          left: 0,
          top: 0,
          backgroundColor: 'rgba(0,0,0,0.2)',
          transition: 'opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: open ? null : 'none',
          opacity: open ? '1' : '0'
        },
        body: {
          width: '100%',
          marginTop: open ? '50vh' : '100vh',
          height: '100vh'
        },
        action: {
          right: 16,
          marginTop: -28,
          position: 'absolute',
          transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
          transform: outerTop < 0.99 ? 'scale(1, 1)' : 'scale(0, 0)'
        },
        content: {
          height: '100%',
          overflow: 'hidden'
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var styles = this.getStyles();

      return _react2.default.createElement(
        _reactCustomScrollbars.Scrollbars,
        {
          autoHide: true,
          onUpdate: function onUpdate(values) {
            return _this3.onOuterScroll(values);
          },
          style: _extends({}, styles.root, this.props.style),
          onClick: this.handleClickOverlay
        },
        _react2.default.createElement(
          _Paper2.default,
          {
            zDepth: 5,
            style: _extends({}, styles.body, this.props.bodyStyle),
            rounded: false,
            onClick: function onClick(e) {
              return e.stopPropagation();
            }
          },
          this.props.action && _react2.default.cloneElement(this.props.action, {
            style: _extends({}, styles.action, this.props.actionStyle)
          }),
          this.state.outerTop < 0.99 ? _react2.default.createElement(
            'div',
            {
              style: _extends({}, styles.content, this.props.contentStyle)
            },
            this.props.children
          ) : _react2.default.createElement(
            _reactCustomScrollbars.Scrollbars,
            {
              style: _extends({}, styles.content, this.props.contentStyle)
            },
            this.props.children
          )
        )
      );
    }
  }]);

  return ExpandableBottomSheet;
}(_react.Component);

exports.default = ExpandableBottomSheet;


ExpandableBottomSheet.defaultProps = {
  open: null
};

ExpandableBottomSheet.propTypes = {
  /** Adds an action element at the top right corner. */
  action: _propTypes2.default.object,
  /** Override the inline-styles of the action element. */
  actionStyle: _propTypes2.default.object,
  /** Override the inline-styles of the body element. */
  bodyStyle: _propTypes2.default.object,
  /** Override the inline-styles of the content element. */
  contentStyle: _propTypes2.default.object,
  /** Fired when the the background is clicked. */
  onRequestClose: _propTypes2.default.func.isRequired,
  /** Fired when the the top when scrolling is reached. */
  onTopReached: _propTypes2.default.func,
  /** Controls whether the bottom sheet is opened or not. */
  open: _propTypes2.default.bool,
  /** Shows the overlay or not. */
  overlay: _propTypes2.default.bool,
  /** Override the inline-styles of the root element. */
  style: _propTypes2.default.object
};