import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Select from 'react-select';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    }
});

const NoOptionsMessage = props => (
    <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
    >
        {props.children}
    </Typography>
);

const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props} />;

const Control = props => (
    <TextField
        fullWidth
        InputProps={{
            inputComponent,
            inputProps: {
                className: props.selectProps.classes.input,
                inputRef: props.innerRef,
                children: props.children,
                ...props.innerProps,
            },
        }}
        {...props.selectProps.textFieldProps}
    />
);

const Option = props => (
    <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
            fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
    >
        {props.children}
    </MenuItem>
);

const Placeholder = props => (
    <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
    >
        {props.children}
    </Typography>
);

const SingleValue = props => (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
        {props.children}
    </Typography>
);

const ValueContainer = props => <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;

const Menu = props => (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
        {props.children}
    </Paper>
);

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

class IntegrationReactSelect extends React.Component {
    state = {
        value: {label: this.props.value}
    };

    handleChange = (value) => {
        this.setState({
            value
        });
        this.props.onChange(value.label);
    };

    render() {
        const { classes, theme } = this.props;

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        return (
            <div className={classes.root}>
                <Select
                    textFieldProps={{
                        label: this.props.label,
                        InputLabelProps: {
                            shrink: true,
                        },
                    }}
                    classes={classes}
                    styles={selectStyles}
                    options={this.props.options}
                    components={components}
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder="Select an item"
                    isClearable
                />
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);
