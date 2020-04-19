package io.spiral.erp.app.service;

import io.spiral.erp.app.repository.UtilisateurAppRepository;
import io.spiral.erp.app.service.dto.UtilisateurDTO;
import io.spiral.erp.app.service.mapper.UtilisateurMapper;
import io.spiral.erp.jhipster.domain.User;
import io.spiral.erp.jhipster.domain.Utilisateur;
import io.spiral.erp.jhipster.repository.UserRepository;
import io.spiral.erp.jhipster.service.UserService;
import io.spiral.erp.jhipster.service.dto.UserDTO;
import org.mapstruct.Named;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.Optional;

@Service
@Transactional
public class UtilisateurAppService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final UtilisateurMapper utilisateurMapper;
    private final UtilisateurQueryService utilisateurQueryService;
    private final UtilisateurAppRepository utilisateurAppRepository;
    private final AuditAppService auditAppService;
    private final UserService userService;
    private final UserRepository userRepository;

    public UtilisateurAppService(UtilisateurMapper utilisateurMapper, UtilisateurQueryService utilisateurQueryService,
                                 UtilisateurAppRepository utilisateurAppRepository, AuditAppService auditAppService,
                                 UserService userService, UserRepository userRepository) {
        this.utilisateurMapper = utilisateurMapper;
        this.utilisateurQueryService = utilisateurQueryService;
        this.utilisateurAppRepository = utilisateurAppRepository;
        this.auditAppService = auditAppService;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public UtilisateurDTO create(UtilisateurDTO utilisateurDTO) {
        log.info("Créer un nouvel Utilisateur: {}", utilisateurDTO);
        Utilisateur utilisateur = utilisateurMapper.toEntity(utilisateurDTO);

        User jhiUser = utilisateur.getJhiUser();
        UserDTO userDTO = new UserDTO(jhiUser);
        User user = userService.registerUser(userDTO, jhiUser.getPassword());

        utilisateur.setJhiUser(user);
        utilisateur.setAudit(auditAppService.createAuditFromNow());

        Utilisateur save = utilisateurAppRepository.save(utilisateur);
        return utilisateurMapper.toDto(save);
    }

    public UtilisateurDTO update(UtilisateurDTO utilisateurDTO) {
        log.info("Modifier un Utilisateur: {}", utilisateurDTO);
        Utilisateur utilisateur = utilisateurMapper.toEntity(utilisateurDTO);
        utilisateur.getAudit().setModifiedAt(ZonedDateTime.now());
        return utilisateurMapper.toDto(utilisateurAppRepository.save(utilisateur));
    }

    public void deleteById(Long id) {
        log.info("Supprimer un Utilisateur avec pour id: {}", id);
        utilisateurAppRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Page<UtilisateurDTO> findAll(String critereTransversal, Pageable pageable) {
        log.info("Rechercher tous les Utilisateur correspondant au critère: {}", critereTransversal);
        Specification<Utilisateur> specification = utilisateurQueryService.createSpecification(critereTransversal);
        Page<Utilisateur> all = utilisateurAppRepository.findAll(specification, pageable);
        return utilisateurAppRepository.findAll(specification, pageable).map(utilisateurMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Optional<UtilisateurDTO> findById(Long id) {
        log.info("Rechercher un Utilisateur ayant pour id: {}", id);
        return utilisateurAppRepository.findById(id).map(utilisateurMapper::toDto);
    }

    @Named("getUtilisateurByLogin")
    public Utilisateur getUtilisateurByLogin(String login) {
        Optional<Utilisateur> optional = utilisateurAppRepository.findByJhiUserLogin(login);
        if (optional.isPresent()) {
            return optional.get();
        } else {
            Utilisateur utilisateur = new Utilisateur();
            User user = userRepository.findOneByLogin(login).get();
            utilisateur.setJhiUser(user);
            utilisateur.setAudit(auditAppService.createAuditFromNow());
            return utilisateurAppRepository.save(utilisateur);
        }
    }
}
