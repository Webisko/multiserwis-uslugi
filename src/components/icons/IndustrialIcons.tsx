import React from 'react';

export interface IndustrialIconProps {
  size?: number;
  className?: string;
}

/**
 * Żuraw samochodowy / Dźwig teleskopowy (Wynajem maszyn / Żurawie)
 */
export const CraneTruckIcon: React.FC<IndustrialIconProps> = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 15L18 4l2.5 2-11.5 9" />
    <path d="M19.2 5v5.5" />
    <path d="M18.2 10.5h2l-.5 2c-.2.8-1 .8-1.2 0l-.3-2z" />
    <rect x="2" y="15" width="14" height="4" rx="1" />
    <path d="M16 16h3.5l1.5 1.5V19H16v-3z" />
    <circle cx="5.5" cy="19.5" r="1.75" />
    <circle cx="11.5" cy="19.5" r="1.75" />
    <circle cx="18" cy="19.5" r="1.75" />
    <path d="M2 21.25h20" strokeOpacity="0.45" />
  </svg>
);

/**
 * Podest ruchomy nożycowy / Zwyżka (Podesty i podnośniki)
 */
export const ScissorLiftIcon: React.FC<IndustrialIconProps> = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="4" y="3" width="16" height="4" rx="1" />
    <path d="M8 3v4" />
    <path d="M16 3v4" />
    <path d="M6 7l12 5" />
    <path d="M18 7L6 12" />
    <path d="M6 12l12 5" />
    <path d="M18 12L6 17" />
    <rect x="3" y="17" width="18" height="2.5" rx="0.75" />
    <circle cx="6.5" cy="20.5" r="1.5" />
    <circle cx="17.5" cy="20.5" r="1.5" />
  </svg>
);

/**
 * Wózek widłowy / Ładowarka teleskopowa (Ładowarki i wózki)
 */
export const ForkliftTelehandlerIcon: React.FC<IndustrialIconProps> = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M17 4v15h4.5" />
    <path d="M17 11h3.5" />
    <path d="M3 13h11v5H3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z" />
    <path d="M6 13V7.5A1.5 1.5 0 0 1 7.5 6H12l2 7" />
    <circle cx="5.5" cy="19" r="2" />
    <circle cx="12.5" cy="19" r="2" />
  </svg>
);

/**
 * Osprzęt specjalistyczny / Trawersa dźwigowa (Sprzęt specjalistyczny)
 */
export const RiggingGearIcon: React.FC<IndustrialIconProps> = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2v3" />
    <circle cx="12" cy="6.5" r="1.5" />
    <path d="M10.8 7.5L5.5 12" />
    <path d="M13.2 7.5l5.3 4.5" />
    <rect x="3" y="12" width="18" height="2.5" rx="0.75" />
    <path d="M6 14.5v3.5" />
    <path d="M18 14.5v3.5" />
    <rect x="4" y="18" width="16" height="3.5" rx="0.75" />
  </svg>
);

/**
 * Relokacja maszyn i linii produkcyjnych (Maszyna na rolkach transportowych z zawiesiem)
 */
export const MachineRelocationIcon: React.FC<IndustrialIconProps> = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2v3" />
    <path d="M8 8l4-3 4 3" />
    <rect x="4" y="8" width="16" height="8.5" rx="1.25" />
    <path d="M8 11.5h3" />
    <circle cx="15" cy="12.25" r="1.5" />
    <circle cx="6.5" cy="19.25" r="1.5" />
    <circle cx="12" cy="19.25" r="1.5" />
    <circle cx="17.5" cy="19.25" r="1.5" />
    <path d="M2 22h20" />
  </svg>
);

/**
 * Usługi spawalnicze (Uchwyt spawalniczy TIG/MIG z łukiem elektrycznym)
 */
export const WeldingTorchIcon: React.FC<IndustrialIconProps> = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M3 20h18" />
    <path d="M18.5 3.5l2 2-6.5 6.5-2.5-.5-.5-2.5 6.5-6.5z" />
    <path d="M11.5 11.5L9 14" />
    <path d="M9 14l-1.5 3.5L11 16" />
    <path d="M6.5 13.5L4 12.5" />
    <path d="M7.5 10.5L6.5 8" />
    <path d="M11.5 17.5l2 1" />
  </svg>
);

/**
 * Konstrukcje stalowe (Węzeł kratownicy / Profil dwuteowy)
 */
export const SteelStructureIcon: React.FC<IndustrialIconProps> = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="3" rx="0.5" />
    <rect x="3" y="18" width="18" height="3" rx="0.5" />
    <path d="M6 6v12" />
    <path d="M18 6v12" />
    <path d="M6 6l12 12" />
    <path d="M18 6L6 12" />
    <path d="M6 12l12 6" />
  </svg>
);

/**
 * Hydraulika i montaż przemysłowy (Rurociąg kołnierzowy z zaworem przemysłowym)
 */
export const IndustrialPipelineIcon: React.FC<IndustrialIconProps> = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M8 4h8" />
    <path d="M12 4v4" />
    <path d="M2 10h20" />
    <path d="M2 16h20" />
    <path d="M5 8.5v9" />
    <path d="M19 8.5v9" />
    <rect x="9" y="8.5" width="6" height="9" rx="1" />
    <circle cx="12" cy="13" r="1.5" />
  </svg>
);

/**
 * Konserwacja i dozór UDT (Zblocze hakowe z tarczą bezpieczeństwa UDT)
 */
export const UdtHookShieldIcon: React.FC<IndustrialIconProps> = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M8 2v4" />
    <rect x="5.5" y="6" width="5" height="4" rx="1" />
    <path d="M8 10v3.5a3.5 3.5 0 1 1-3.5-3.5" />
    <path d="M16.5 9l4.5 1.8v4.2c0 3.2-2 5.6-4.5 6.8-2.5-1.2-4.5-3.6-4.5-6.8v-4.2L16.5 9z" />
    <path d="M14.7 15.2l1.3 1.3 2.5-2.6" />
  </svg>
);

/**
 * Usługi elektryczne, rozruch i pomiary (Szafa rozdzielcza z impulsem energetycznym)
 */
export const SwitchgearPowerIcon: React.FC<IndustrialIconProps> = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="4" y="2.5" width="16" height="19" rx="1.5" />
    <path d="M8 6.5h4" />
    <circle cx="15.5" cy="6.5" r="1" />
    <path d="M13 10l-3 4.5h3.5L11 19" />
    <path d="M7.5 12v3" strokeOpacity="0.5" />
  </svg>
);

/**
 * Szkolenia i uprawnienia techniczne UDT / SEP / Spawalnicze (Tarcza kwalifikacji)
 */
export const TechnicalCertIcon: React.FC<IndustrialIconProps> = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="14" rx="1.5" />
    <path d="M7 7.5h6" />
    <path d="M7 11h4" />
    <circle cx="15.5" cy="14" r="3.5" />
    <path d="M14 17l-1 4 2.5-1.5L18 21l-1-4" />
  </svg>
);

/**
 * Techniczny znacznik wyboru (zamiast tekstowych ✓ oraz •)
 */
export const CheckMarkIcon: React.FC<IndustrialIconProps> = ({ size = 18, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

/**
 * Ikony dla sekcji „Dlaczego jedno źródło usług?” (01 Synergia, 02 Koszty, 03 Jakość ISO)
 */
export const SynergyHubIcon: React.FC<IndustrialIconProps> = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="3.25" />
    <circle cx="5" cy="6" r="2" />
    <circle cx="19" cy="6" r="2" />
    <circle cx="5" cy="18" r="2" />
    <circle cx="19" cy="18" r="2" />
    <path d="M6.7 7.4l2.8 2.4" />
    <path d="M17.3 7.4l-2.8 2.4" />
    <path d="M6.7 16.6l2.8-2.4" />
    <path d="M17.3 16.6l-2.8-2.4" />
  </svg>
);

export const CostOptimizationIcon: React.FC<IndustrialIconProps> = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M7 10l3.5 3.5 3-3L17 14" />
    <path d="M14 14h3v-3" />
    <path d="M7 17h10" strokeOpacity="0.45" />
  </svg>
);

export const QualityProcessIcon: React.FC<IndustrialIconProps> = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2.5l7.5 3v6.2c0 5-3.2 8.7-7.5 10.3-4.3-1.6-7.5-5.3-7.5-10.3V5.5L12 2.5z" />
    <path d="M8.8 12.2l2.2 2.2 4.4-4.5" />
  </svg>
);

/**
 * Helper zwracający dedykowaną ikonę przemysłową po slugu usługi
 */
export const ServiceIconBySlug: React.FC<{ slug: string; size?: number; className?: string }> = ({
  slug,
  size = 32,
  className = '',
}) => {
  switch (slug) {
    case 'relokacja':
      return <MachineRelocationIcon size={size} className={className} />;
    case 'wynajem':
      return <CraneTruckIcon size={size} className={className} />;
    case 'spawanie':
      return <WeldingTorchIcon size={size} className={className} />;
    case 'budownictwo':
      return <IndustrialPipelineIcon size={size} className={className} />;
    case 'udt':
      return <UdtHookShieldIcon size={size} className={className} />;
    case 'elektryka':
      return <SwitchgearPowerIcon size={size} className={className} />;
    default:
      return <SteelStructureIcon size={size} className={className} />;
  }
};
