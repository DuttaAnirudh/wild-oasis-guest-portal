"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function NoCustomSignupsAlert() {
  return (
    <Alert>
      <AlertTitle className="font-extrabold">
        Custom Signups - DISABLED!
      </AlertTitle>
      <AlertDescription>
        Due to security reasons, custom sign ups have been disabled. You can
        still sign in using your gmail account.
      </AlertDescription>
    </Alert>
  );
}

export default NoCustomSignupsAlert;
