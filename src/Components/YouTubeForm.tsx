import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
// import { useEffect } from "react";

let renderCount = 0;
type FromValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

function YouTubeForm() {
  const form = useForm<FromValues>({
    defaultValues: {
      username: "girish",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
  } = form;
  const handlegetvalues = () => {
    console.log("get values", getValues("age"));
  };

  const handlesetvalue = () => {
    setValue("username", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);
  // const watchusername = watch(["username", "email", "age"]);
  const { errors, touchedFields, dirtyFields, isDirty } = formState;
  console.log({ touchedFields, dirtyFields, isDirty });
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });
  const onSubmit = (data: FromValues) => {
    console.log("form submitted", data);
  };
  renderCount++;
  return (
    <div>
      <h1>YouTubeForm{renderCount / 2}</h1>
      {/* <h2>Watched values:{watchusername}</h2> */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", { required: "username is required" })}
        />
        <p style={{ color: "red" }}>{errors.username?.message}</p>
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          {...register("email", {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "invalid email format",
            },
            validate: {
              notAdmin: (fieldvalue) => {
                return (
                  fieldvalue !== "admin@example.com" ||
                  "enter a different email address"
                );
              },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("baddomain.com") ||
                  "this domain is not supported"
                );
              },
            },
          })}
        />
        <p style={{ color: "red" }}>{errors.email?.message}</p>
        <div>
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", { required: "channel name is required" })}
          />
          <p style={{ color: "red" }}>{errors.channel?.message}</p>
        </div>

        <div>
          <label htmlFor="twitter">Twitter</label>
          <input type="text" id="twitter" {...register("social.twitter")} />
        </div>

        <div>
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>

        <div>
          <label htmlFor="primary-phone">primary phone number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0")}
          />
        </div>
        <div>
          <label htmlFor="secondary-phone">secondary phone number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1")}
          />
        </div>
        <div>
          <label htmlFor="">List of Phone Numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                  />
                  <button type="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                </div>
              );
            })}
            <button type="button" onClick={() => append({ number: "" })}>
              add phone number
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              // disabled: true,
              valueAsNumber: true,
              required: {
                value: true,
                message: "age is required",
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: {
                value: true,
                message: "dateofbirth  is required",
              },
            })}
          />
        </div>

        <button>Submit</button>
        <button type="button" onClick={handlegetvalues}>
          GetValues
        </button>
        <button type="button" onClick={handlesetvalue}>
          SetValues
        </button>
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default YouTubeForm;
