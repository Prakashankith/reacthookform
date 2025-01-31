import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
let renderCount = 0;
type FromValues = {
  username: string;
  email: string;
  channel: string;
};

function YouTubeForm() {
  const form = useForm<FromValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = (data: FromValues) => {
    console.log("form submitted", data);
  };
  renderCount++;
  return (
    <div>
      <h1>YouTubeForm{renderCount / 2}</h1>
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
            validate: (fieldValue) => {
              return (
                fieldValue !== "admin@example.com" ||
                "enter a different email address"
              );
            },
          })}
        />
        <p style={{ color: "red" }}>{errors.email?.message}</p>

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", { required: "channel name is required" })}
        />
        <p style={{ color: "red" }}>{errors.channel?.message}</p>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default YouTubeForm;
