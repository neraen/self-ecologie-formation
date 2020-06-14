<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ResultatEvaluationRepository")
 */
class ResultatEvaluation
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity = "User", inversedBy="utilisateurEvaluation")
     */
    private $utilisateur;

    /**
     * @ORM\ManyToOne(targetEntity = "Evaluation", inversedBy="evaluationUtilisateur")
     */
    private $evaluation;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date_resultat;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $resultat;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $response_utilisateur;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUtilisateurId(): ?int
    {
        return $this->utilisateur_id;
    }

    public function setUtilisateurId(int $utilisateur_id): self
    {
        $this->utilisateur_id = $utilisateur_id;

        return $this;
    }

    public function getEvaluationId(): ?int
    {
        return $this->evaluation_id;
    }

    public function setEvaluationId(int $evaluation_id): self
    {
        $this->evaluation_id = $evaluation_id;

        return $this;
    }

    public function getDateResultat(): ?\DateTimeInterface
    {
        return $this->date_resultat;
    }

    public function setDateResultat(\DateTimeInterface $date_resultat): self
    {
        $this->date_resultat = $date_resultat;

        return $this;
    }

    public function getResultat(): ?string
    {
        return $this->resultat;
    }

    public function setResultat(?string $resultat): self
    {
        $this->resultat = $resultat;

        return $this;
    }

    public function getResponseUtilisateur(): ?string
    {
        return $this->response_utilisateur;
    }

    public function setResponseUtilisateur(string $response_utilisateur): self
    {
        $this->response_utilisateur = $response_utilisateur;

        return $this;
    }
}
