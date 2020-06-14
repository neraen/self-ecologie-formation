<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\FasciculeRepository")
 * @ApiResource()
 */
class Fascicule
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
    private $libelle;

    /**
     * @ORM\Column(type="integer")
     */
    private $duree;

    /**
     * @ORM\Column(type="text")
     */
    private $content;

    /**
     * @ORM\Column(type="integer")
     */
    private $ordre;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $label_difficulte;

    /**
     * @ORM\ManyToOne(targetEntity="Module", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $module_id;

    /**
     * @ORM\OneToMany(targetEntity="ProgressionFascicule", mappedBy="fascicule")
     */
    private $fasciculeUtilisateur;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created_at;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updated_at;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLibelle(): ?string
    {
        return $this->libelle;
    }

    public function setLibelle(string $libelle): self
    {
        $this->libelle = $libelle;

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

    public function getLabelDifficulte(): ?string
    {
        return $this->label_difficulte;
    }

    public function setLabelDifficulte(string $label_difficulte): self
    {
        $this->label_difficulte = $label_difficulte;

        return $this;
    }

    public function getModuleId()
    {
        return $this->module_id;
    }

    public function setModuleId($module_id): self
    {
        $this->module_id = $module_id;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;

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
    public function getFasciculeUtilisateur()
    {
        return $this->fasciculeUtilisateur;
    }

    /**
     * @param mixed $fasciculeUtilisateur
     */
    public function setFasciculeUtilisateur($fasciculeUtilisateur): void
    {
        $this->fasciculeUtilisateur = $fasciculeUtilisateur;
    }

    /**
     * @return mixed
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * @param mixed $content
     */
    public function setContent($content): void
    {
        $this->content = $content;
    }

    /**
     * @return mixed
     */
    public function getOrdre()
    {
        return $this->ordre;
    }

    /**
     * @param mixed $ordre
     */
    public function setOrdre($ordre): void
    {
        $this->ordre = $ordre;
    }






}
