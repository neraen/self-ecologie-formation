<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProgressionUtilisateurRepository")
 */
class ProgressionUtilisateur
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\user", inversedBy="utilisateurProgression")
     * @ORM\JoinColumn(nullable=false)
     */
    private $utilisateur;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Module", inversedBy="progressionUtilisateur")
     * @ORM\JoinColumn(nullable=false)
     */
    private $module;

    /**
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private $numeroFascicule;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUtilisateur(): ?Utilisateur
    {
        return $this->utilisateur;
    }

    public function setUtilisateur(?Utilisateur $utilisateur): self
    {
        $this->utilisateur = $utilisateur;

        return $this;
    }

    public function getModule(): ?Module
    {
        return $this->module;
    }

    public function setModule(?Module $module): self
    {
        $this->module = $module;

        return $this;
    }

    public function getNumeroFascicule(): ?int
    {
        return $this->numeroFascicule;
    }

    public function setNumeroFascicule(int $numeroFascicule): self
    {
        $this->numeroFascicule = $numeroFascicule;

        return $this;
    }

    public function __toString()
    {
        return $this->getUtilisateur()->getId()." ".$this->getModule()->getId()." ".$this->getNumeroFascicule();
    }
}
