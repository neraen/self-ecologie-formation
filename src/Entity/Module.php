<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ModuleRepository")
 * @ApiResource()
 */
class Module
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nom;

    /**
     * @ORM\Column(type="float")
     */
    private $prix;

    /**
     * @ORM\Column(type="integer")
     */
    private $duree;

    /**
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @ORM\Column(type="string")
     */
    private $image;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updated_at;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private $droit;

    /**
     * @ORM\OneToMany(targetEntity="ProgressionModule", mappedBy="module")
     */
    private $moduleUtilisateur;

    /**
     * @ORM\OneToMany(targetEntity="Comptabilite", mappedBy="module")
     */
    private $moduleComptabilite;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProgressionUtilisateur", mappedBy="module", orphanRemoval=true)
     */
    private $progressionUtilisateur;

    public function __construct()
    {
        $this->progressionUtilisateur = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrix(): ?float
    {
        return $this->prix;
    }

    public function setPrix(float $prix): self
    {
        $this->prix = $prix;

        return $this;
    }

    public function getDuree(): ?int
    {
        return $this->duree;
    }

    public function setDuree(int $duree): self
    {
        $this->duree = $duree;

        return $this;
    }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(\DateTimeInterface $created): self
    {
        $this->created = $created;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?\DateTimeInterface $updated_at): self
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getModuleUtilisateur()
    {
        return $this->moduleUtilisateur;
    }

    /**
     * @param mixed $moduleUtilisateur
     */
    public function setModuleUtilisateur($moduleUtilisateur): void
    {
        $this->moduleUtilisateur = $moduleUtilisateur;
    }

    /**
     * @return mixed
     */
    public function getModuleComptabilite()
    {
        return $this->moduleComptabilite;
    }

    /**
     * @param mixed $moduleComptabilite
     */
    public function setModuleComptabilite($moduleComptabilite): void
    {
        $this->moduleComptabilite = $moduleComptabilite;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     */
    public function setDescription($description): void
    {
        $this->description = $description;
    }

    /**
     * @return mixed
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * @param mixed $image
     */
    public function setImage($image): void
    {
        $this->image = $image;
    }

    public function __toString() {
        return $this->nom;
    }

    /**
     * @return Collection|ProgressionUtilisateur[]
     */
    public function getProgressionUtilisateur(): Collection
    {
        return $this->progressionUtilisateur;
    }

    public function addProgressionUtilisateur(ProgressionUtilisateur $progressionUtilisateur): self
    {
        if (!$this->progressionUtilisateur->contains($progressionUtilisateur)) {
            $this->progressionUtilisateur[] = $progressionUtilisateur;
            $progressionUtilisateur->setModule($this);
        }

        return $this;
    }

    public function removeProgressionUtilisateur(ProgressionUtilisateur $progressionUtilisateur): self
    {
        if ($this->progressionUtilisateur->contains($progressionUtilisateur)) {
            $this->progressionUtilisateur->removeElement($progressionUtilisateur);
            // set the owning side to null (unless already changed)
            if ($progressionUtilisateur->getModule() === $this) {
                $progressionUtilisateur->setModule(null);
            }
        }

        return $this;
    }

    /**
     * @return mixed
     */
    public function getDroit()
    {
        return $this->droit;
    }

    /**
     * @param mixed $droit
     */
    public function setDroit($droit): void
    {
        $this->droit = $droit;
    }



}
