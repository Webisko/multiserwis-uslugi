import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { getWhatsAppUrl, useCompanyData, type CompanyData } from '../data/company';
import { WhatsAppIcon } from './WhatsAppIcon';
import { TechnicalCertIcon } from './icons/IndustrialIcons';

type ServiceInquiryCtaProps = {
  title: string;
  description: string;
  contactLabel?: string;
  trainingTitle?: string;
  trainingDescription?: string;
  trainingLabel?: string;
  companyData?: CompanyData;
};

export const ServiceInquiryCta: React.FC<ServiceInquiryCtaProps> = ({
  title,
  description,
  contactLabel = 'Poproś o wycenę',
  trainingTitle,
  trainingDescription,
  trainingLabel = 'Zobacz ofertę szkoleń',
  companyData,
}) => {
  const contextCompany = useCompanyData();
  const company = companyData ?? contextCompany;
  const hasSecondaryServicePhone = Boolean(
    company.phones.services.secondaryValue && company.phones.services.secondaryHref
  );
  const primaryWhatsAppUrl = getWhatsAppUrl(
    company.phones.services.href,
    company.phones.services.value
  );

  return (
    <div
      className={`grid grid-cols-1 gap-6 ${
        trainingTitle && trainingDescription
          ? 'lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,1fr)]'
          : ''
      }`}
    >
      <div className="rounded-2xl border border-gray-800 bg-industrial-900 p-6 sm:p-8 md:p-10">
        <h2 className="mb-3 font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-gray-300">{description}</p>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={`${company.links.basePath}/kontakt`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-industrial-accent px-6 py-3.5 text-sm font-bold text-industrial-950 transition-colors hover:bg-industrial-accentHover sm:w-auto sm:text-base shadow-sm"
          >
            <Phone size={18} />
            {contactLabel}
          </a>
          <a
            href={company.phones.services.href}
            className="inline-flex w-full items-center justify-center rounded-lg border border-gray-700 bg-industrial-950/60 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:border-industrial-accent hover:text-industrial-accent sm:w-auto sm:text-base"
          >
            Zadzwoń: {company.phones.services.value}
          </a>
          {hasSecondaryServicePhone ? (
            <a
              href={company.phones.services.secondaryHref}
              className="inline-flex w-full items-center justify-center rounded-lg border border-gray-700 bg-industrial-950/60 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:border-industrial-accent hover:text-industrial-accent sm:w-auto sm:text-base"
            >
              Tel. 2: {company.phones.services.secondaryValue}
            </a>
          ) : null}
          {primaryWhatsAppUrl ? (
            <a
              href={primaryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-5 py-3.5 text-sm font-semibold text-emerald-300 transition-colors hover:border-emerald-400 hover:text-white sm:w-auto sm:text-base"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          ) : null}
        </div>
      </div>

      {trainingTitle && trainingDescription ? (
        <div className="rounded-2xl border border-gray-800 bg-industrial-900/70 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-industrial-accent">
              <TechnicalCertIcon size={18} />
              <span>Szkolenia i uprawnienia</span>
            </div>
            <h3 className="mb-3 font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
              {trainingTitle}
            </h3>
            <p className="mb-6 text-sm sm:text-base leading-relaxed text-gray-300">
              {trainingDescription}
            </p>
          </div>
          <a
            href={company.links.trainingSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-industrial-accent transition-colors hover:text-white sm:text-base group w-fit"
          >
            {trainingLabel}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      ) : null}
    </div>
  );
};
