import { COLORS } from "@/constants/colors";
import { FormControlProps } from "@/types/form";
import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";

export const Formcontrol = ({
  bg,
  mb,
  type,
  placeholder,
  label,
  name,
  value,
  color,
  width,
  height,
  variant,
  textAlign,
  borderColor,
  fontSize,
  handleChange,
  onBlur,
  isInvalid,
  onKeyPress,
  isRequired,
  onKeyDown,
  onFocus,
  disabled,
}: FormControlProps): JSX.Element => {
  return (
    <Box width={width || "100%"}>
      <FormControl width="100%" mb={mb || "1rem"} isRequired={isRequired}>
        {label && (
          <FormLabel
            width={"100%"}
            color={color || COLORS.u_black}
            fontSize={"1rem"}
          >
            {label}
          </FormLabel>
        )}

        <Input
          variant={variant}
          bg={bg}
          color={color}
          name={name}
          width="100%"
          height={height || ["2.8rem"]}
          type={type}
          placeholder={placeholder}
          borderBottom={`1px solid ${COLORS.formGray}`}
          border={variant !== "flushed" ? `1px solid ${COLORS.formGray}` : ""}
          borderColor={borderColor}
          borderRadius={variant === "flushed" ? "" : ".4rem"}
          value={value}
          fontSize={fontSize || ["1rem"]}
          textAlign={textAlign || "left"}
          onChange={handleChange}
          onKeyPress={onKeyPress}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          isInvalid={isInvalid}
          errorBorderColor={COLORS.red}
          disabled={disabled}
          _placeholder={{
            fontSize: ".9rem",
            color,
          }}
          focusBorderColor={borderColor || COLORS.formGray}
        />
      </FormControl>
    </Box>
  );
};
