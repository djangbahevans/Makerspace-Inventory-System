import { MenuItem, Paper, TextField, Typography } from "@mui/material";
import type { InputBaseComponentProps } from "@mui/material/InputBase";
import { useTheme } from "@mui/material/styles";
import type { TextFieldProps } from "@mui/material/TextField";
import React from "react";
import type {
  ControlProps,
  GroupBase,
  MenuProps,
  NoticeProps,
  OptionProps,
  PlaceholderProps,
  Props as ReactSelectProps,
  SingleValueProps,
  StylesConfig,
  ValueContainerProps,
} from "react-select";
import Select from "react-select";

type OptionType = {
  label: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: OptionType[];
  label?: string;
  readOnly?: boolean;
};

type IsMulti = false;
type Group = GroupBase<OptionType>;

type SelectPropsWithExtras = ReactSelectProps<OptionType, IsMulti, Group> & {
  textFieldProps: TextFieldProps;
};

const inputComponent = React.forwardRef<
  HTMLDivElement,
  InputBaseComponentProps
>(function InputComponent(props, ref) {
  return <div ref={ref} {...props} />;
});

const Option = (props: OptionProps<OptionType, IsMulti, Group>) => (
  <MenuItem
    ref={props.innerRef}
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

const Autosuggest = ({ value, onChange, options, label, readOnly }: Props) => {
  const theme = useTheme();
  const [selected, setSelected] = React.useState<OptionType | null>(
    value ? { label: value } : null,
  );

  React.useEffect(() => {
    setSelected(value ? { label: value } : null);
  }, [value]);

  const selectStyles: StylesConfig<OptionType, IsMulti, Group> = {
    input: (base) => ({
      ...base,
      color: theme.palette.text.primary,
      "& input": {
        font: "inherit",
      },
    }),
  };

  const components = React.useMemo(() => {
    const NoOptionsMessage = (
      props: NoticeProps<OptionType, IsMulti, Group>,
    ) => (
      <Typography
        color="textSecondary"
        sx={{ padding: `${theme.spacing(1)} ${theme.spacing(2)}` }}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );

    const Control = (props: ControlProps<OptionType, IsMulti, Group>) => {
      const selectProps = props.selectProps as unknown as SelectPropsWithExtras;

      // `react-select` provides DOM props typed for a <div>, while MUI's `inputProps`
      // expects `InputBaseComponentProps` (input/textarea-ish). This cast is the most
      // accurate representation of what's happening at runtime without falling back to `any`.
      const innerInputProps =
        props.innerProps as unknown as InputBaseComponentProps;

      return (
        <TextField
          fullWidth
          slotProps={{
            input: {
              inputComponent,
              inputProps: {
                style: { display: "flex", padding: 0 },
                inputRef: props.innerRef,
                children: props.children,
                ...innerInputProps,
              },
            },
          }}
          {...selectProps.textFieldProps}
        />
      );
    };

    const Placeholder = (
      props: PlaceholderProps<OptionType, IsMulti, Group>,
    ) => (
      <Typography
        color="textSecondary"
        sx={{ position: "absolute", left: 2, fontSize: 16 }}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );

    const SingleValue = (
      props: SingleValueProps<OptionType, IsMulti, Group>,
    ) => (
      <Typography sx={{ fontSize: 16 }} {...props.innerProps}>
        {props.children}
      </Typography>
    );

    const ValueContainer = (
      props: ValueContainerProps<OptionType, IsMulti, Group>,
    ) => (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flex: 1,
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {props.children}
      </div>
    );

    const Menu = (props: MenuProps<OptionType, IsMulti, Group>) => (
      <Paper
        square
        sx={{
          position: "absolute",
          zIndex: 1,
          marginTop: theme.spacing(1),
          left: 0,
          right: 0,
        }}
        {...props.innerProps}
      >
        {props.children}
      </Paper>
    );

    return {
      Control,
      Menu,
      NoOptionsMessage,
      Option,
      Placeholder,
      SingleValue,
      ValueContainer,
    };
  }, [theme]);

  const SelectWithExtras =
    Select as unknown as React.ComponentType<SelectPropsWithExtras>;

  return (
    <div style={{ flexGrow: 1 }}>
      <SelectWithExtras
        textFieldProps={{
          label,
          InputLabelProps: {
            shrink: true,
          },
        }}
        isDisabled={readOnly}
        styles={selectStyles}
        options={options}
        components={components}
        value={selected}
        onChange={(next) => {
          const selectedValue = next as OptionType | null;
          setSelected(selectedValue);
          onChange(selectedValue?.label ?? "");
        }}
        placeholder="Select an item"
        isClearable
      />
    </div>
  );
};

export default Autosuggest;
