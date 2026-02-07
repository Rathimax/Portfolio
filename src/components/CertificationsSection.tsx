import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Award } from "lucide-react";

interface Certification {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
  issuer: string;
  date: string;
  validUntil: string;
  credentialId: string;
  pdfUrl?: string;
}

interface CertificationsSectionProps {
  certifications?: Certification[];
}

const defaultCertifications: Certification[] = [
  {
    id: 1,
    title:
      "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    description: "Oracle Cloud Infrastructure AI Foundations certification",
    detailedDescription:
      "This certification validates foundational knowledge of artificial intelligence and machine learning concepts within Oracle Cloud Infrastructure. It demonstrates understanding of AI services, ML workflows, and the ability to implement AI solutions using OCI's comprehensive suite of tools and services.",
    image: "/certifications/Associate.jpeg",
    issuer: "Oracle",
    date: "September 19, 2025",
    validUntil: "September 19, 2027",
    credentialId: "102675121OCI25AICFA",
    pdfUrl: "/certifications/Oracle_AI_foundation_associate.pdf",
  },
  {
    id: 2,
    title:
      "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    description:
      "Oracle Cloud Infrastructure Generative AI Professional certification",
    detailedDescription:
      "This professional-level certification demonstrates advanced expertise in generative AI technologies and their implementation on Oracle Cloud Infrastructure. It validates the ability to design, develop, and deploy generative AI solutions, including large language models, and leverage OCI's advanced AI capabilities for enterprise applications.",
    image: "/certifications/professional.jpg",
    issuer: "Oracle",
    date: "October 03, 2025",
    validUntil: "October 03, 2027",
    credentialId: "102675121OCI25GAIOCP",
    pdfUrl: "/certifications/Oracle_Generative_AI_Professional.pdf",
  },
];

const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications = defaultCertifications,
}) => {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleCardClick = (certId: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(certId)) {
        newSet.delete(certId);
      } else {
        newSet.add(certId);
      }
      return newSet;
    });
  };

  const handleCardHover = (certId: number) => {
    setHoveredCard(certId);
  };

  const handleCardLeave = (certId: number) => {
    setHoveredCard(null);
    setTimeout(() => {
      setFlippedCards((prev) => {
        const newSet = new Set(prev);
        newSet.delete(certId);
        return newSet;
      });
    }, 50);
  };

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-transparent text-foreground transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            CERTIFICATIONS & BADGES
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and achievements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => {
            const isFlipped = flippedCards.has(cert.id);
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="h-[400px] perspective-1000"
                onMouseEnter={() => handleCardHover(cert.id)}
                onMouseLeave={() => handleCardLeave(cert.id)}
                onClick={() => handleCardClick(cert.id)}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d cursor-pointer ${isFlipped ? "rotate-y-180" : ""
                    }`}
                >
                  {/* Front of card */}
                  <Card className="absolute inset-0 w-full h-full flex flex-col overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 backface-hidden bg-background">
                    <div className="h-48 overflow-hidden flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className={`w-auto h-full object-contain transition-transform duration-300 ${!isFlipped ? "hover:scale-110" : ""
                          }`}
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-base">{cert.title}</CardTitle>
                      <CardDescription>{cert.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground">
                          <span className="font-semibold">Issuer:</span>{" "}
                          {cert.issuer}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-semibold">Date:</span>{" "}
                          {cert.date}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {cert.pdfUrl && (
                        <Button variant="default" size="sm" asChild>
                          <a
                            href={cert.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleButtonClick}
                          >
                            <Award className="mr-2 h-4 w-4" />
                            View Certificate
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>

                  {/* Back of card */}
                  <Card className="absolute inset-0 w-full h-full flex flex-col overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 backface-hidden rotate-y-180 bg-background z-10">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-primary text-base">
                        {cert.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        Certification Details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow overflow-y-auto">
                      <p className="text-sm leading-relaxed text-foreground/90 mb-4">
                        {cert.detailedDescription}
                      </p>
                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground">
                          <span className="font-semibold">Issuer:</span>{" "}
                          {cert.issuer}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-semibold">Issued:</span>{" "}
                          {cert.date}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-semibold">Valid Until:</span>{" "}
                          {cert.validUntil}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-semibold">Credential ID:</span>{" "}
                          {cert.credentialId}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-4">
                      {cert.pdfUrl && (
                        <Button variant="default" size="sm" asChild>
                          <a
                            href={cert.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleButtonClick}
                          >
                            <Award className="mr-2 h-4 w-4" />
                            View Certificate
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default CertificationsSection;
