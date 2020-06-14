<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ComptabiliteRepository")
 */
class Comptabilite
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity = "User", inversedBy="utilisateurComptabilite")
     */
    private $utilisateur;

    /**
     * @ORM\ManyToOne(targetEntity = "Module", inversedBy="moduleUtilisateur")
     */
    private $module;

    /**
     * @ORM\Column(type="string")
     */
    private $type_paiement;

    /**
     * @ORM\Column(type="boolean")
     */
    private $paiement_accepte;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updated_at;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $created_at;


    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getUtilisateur()
    {
        return $this->utilisateur;
    }

    /**
     * @param mixed $utilisateur
     */
    public function setUtilisateur($utilisateur): void
    {
        $this->utilisateur = $utilisateur;
    }

    /**
     * @return mixed
     */
    public function getModule()
    {
        return $this->module;
    }

    /**
     * @param mixed $module
     */
    public function setModule($module): void
    {
        $this->module = $module;
    }

    /**
     * @return mixed
     */
    public function getTypePaiement()
    {
        return $this->type_paiement;
    }

    /**
     * @param mixed $type_paiement
     */
    public function setTypePaiement($type_paiement): void
    {
        $this->type_paiement = $type_paiement;
    }

    /**
     * @return mixed
     */
    public function getPaiementAccepte()
    {
        return $this->paiement_accepte;
    }

    /**
     * @param mixed $paiement_accepte
     */
    public function setPaiementAccepte($paiement_accepte): void
    {
        $this->paiement_accepte = $paiement_accepte;
    }

    /**
     * @return mixed
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * @param mixed $updated_at
     */
    public function setUpdatedAt($updated_at): void
    {
        $this->updated_at = $updated_at;
    }

    /**
     * @return mixed
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * @param mixed $created_at
     */
    public function setCreatedAt($created_at): void
    {
        $this->created_at = $created_at;
    }

    public function __toString() {
        return (string)$this->id;
    }
}
