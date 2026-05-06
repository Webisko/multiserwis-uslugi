import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { useCompanyData, type CompanyData } from '../data/company';

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

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,1fr)]">
      <div className="rounded-2xl border border-gray-800 bg-industrial-900 p-8 md:p-10">
        <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">{title}</h3>
        <p className="max-w-2xl text-gray-300 leading-relaxed">{description}</p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href={`${company.links.basePath}/kontakt`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-industrial-accent px-6 py-3 font-bold text-industrial-900 transition-colors hover:bg-industrial-accentHover"
          >
            <Phone size={18} />
            {contactLabel}
          </a>
          <a
            href={company.phones.services.href}
            className="inline-flex items-center justify-center rounded-lg border border-gray-700 px-6 py-3 font-semibold text-white transition-colors hover:border-industrial-accent hover:text-industrial-accent"
          >
            Zadzwoń: {company.phones.services.value}
          </a>
        </div>
      </div>

      {trainingTitle && trainingDescription ? (
        <div className="rounded-2xl border border-dashed border-gray-700 bg-industrial-900/60 p-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-industrial-accent">Cross-sell szkoleń</p>
          <h4 className="mb-3 text-xl font-bold text-white">{trainingTitle}</h4>
          <p className="mb-6 text-sm leading-relaxed text-gray-400">{trainingDescription}</p>
          <a
            href={company.links.trainingSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold text-industrial-accent transition-colors hover:text-white"
          >
            {trainingLabel}
            <ArrowRight size={16} />
          </a>
        </div>
      ) : null}
    </div>
  );
};