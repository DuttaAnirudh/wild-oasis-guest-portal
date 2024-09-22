import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import LoginMessage from "./LoginMessage";
import useSupabaseUser from "../_hooks/useSupabaseUser";

async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();
  const { user } = await useSupabaseUser();

  let fullName;
  if (session) {
    fullName = session.user.name;
  } else if (user) {
    fullName = user.user_metadata.fullName;
  }

  const activeSession = session || user;

  return (
    <div className="grid grid-rows-2 gap-4 lg:gap-0 lg:grid-rows-1 lg:grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />
      {activeSession ? (
        <ReservationForm cabin={cabin} user={fullName} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
