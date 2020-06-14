<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EvaluationRepository")
 */
class Evaluation
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $fascicule_id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $reponse;

    /**
     * @ORM\Column(type="integer")
     */
    private $nb_question;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFasciculeId(): ?int
    {
        return $this->fascicule_id;
    }

    public function setFasciculeId(int $fascicule_id): self
    {
        $this->fascicule_id = $fascicule_id;

        return $this;
    }

    public function getReponse(): ?string
    {
        return $this->reponse;
    }

    public function setReponse(string $reponse): self
    {
        $this->reponse = $reponse;

        return $this;
    }

    public function getNbQuestion(): ?int
    {
        return $this->nb_question;
    }

    public function setNbQuestion(int $nb_question): self
    {
        $this->nb_question = $nb_question;

        return $this;
    }
}
