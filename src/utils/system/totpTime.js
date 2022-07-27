export const totpTime = () => 30 - Math.round(new Date() / 1000) % 30;
